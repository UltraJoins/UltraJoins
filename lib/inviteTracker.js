const { Client, Collection } = require("discord.js");
const { EventEmitter } = require("events");

const mapInviteData = (invite) => {
    return {
        code: invite.code,
        uses: invite.uses,
        maxUses: invite.maxUses,
        inviterId: invite.inviterId,
        guildId: invite.guild.id
    };
};

const compareInvites = (cachedInvites, currentInvites) => {
    return currentInvites.find((invite) => 
        invite.uses !== 0
        && cachedInvites.has(invite.code)
        && cachedInvites.get(invite.code).uses < invite.uses
    );
};

class InvitesTracker extends EventEmitter {
    /**
     * 
     * @param {Client} client 
     */
    constructor(client, options) {
        super();
        this.client = client;
        this.cache = new Collection();
        this.options = {
            guildId: options?.guildId,
            guildFilter: options?.guildFilter
        };

        if(this.client.isReady()) {
            this.fetchCache();
        } else {
            this.client.on("ready", () => {
                this.fetchCache();
            });
        };

        this.client.on("guildMemberAdd", (member) => {
            if(options?.guildId && options.guildId !== member.guild.id) return;
            if(options?.guildFilter && options.guildFilter(member.guild)) return;
            if(member.user.bot) {
                this.emit("guildMemberAdd", member, "bot", null);
            } else {
                if((member.guild.members?.me || member.guild.me).permissions.has("MANAGE_GUILD")) {
                    member.guild.invites.fetch().then((currentInvites) => {
                        const inviteUsed = compareInvites(this.cache, currentInvites);
                        if(inviteUsed) {
                            this.cache.set(inviteUsed.code, mapInviteData(inviteUsed));
                            this.emit("guildMemberAdd", member, "normal", inviteUsed);
                        } else {
                            if(member.guild.vanityURLCode) {
                                this.emit("guildMemberAdd", member, "vanity", null);
                            } else {
                                this.emit("guildMemberAdd", member, "unknown", null);
                            };
                        };
                    }).catch(() => {});
                } else {
                    this.emit("guildMemberAdd", member, "permissions", null);
                };
            };
        });

        this.client.on("inviteCreate", (invite) => {
            let data = mapInviteData(invite);
            this.cache.set(invite.code, data);
            if(options?.guildId && options.guildId !== invite.guild.id) return;
            if(options?.guildFilter && options.guildFilter(invite.guild)) return;
            this.emit("inviteCreate", this.cache.get(invite.code));
        });

        this.client.on("inviteDelete", (invite) => {
            let data = this.cache.get(invite.code);
            this.cache.delete(invite.code);
            if(options?.guildId && options.guildId !== invite.guild.id) return;
            if(options?.guildFilter && options.guildFilter(invite.guild)) return;
            this.emit("inviteDelete", data);
        });
    };

    fetchGuildCache = (guildId) => {
        return new Promise((resolve) => {
            this.client.guilds.fetch(guildId).then((guild) => {
                guild.invites.fetch().then((invites) => {
                    invites.map((invite) => {
                        this.cache.set(invite.code, mapInviteData(invite));
                    });
                    resolve();
                }).catch(() => {
                    resolve();
                });
            });
        });
    };

    fetchCache = () => {
        this.client.guilds.fetch().then((guilds) => {
            Promise.all(
                guilds.map(({ id }) => this.fetchGuildCache(id))
            ).then(() => {
                this.emit("cacheFetched", this.cache);
            });
        });
    };
};

module.exports = InvitesTracker;