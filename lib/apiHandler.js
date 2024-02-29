const express = require("express");
const app = express();
const config = require("../config");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const { Client, GatewayIntentBits } = require("discord.js");
const mongoose = require("mongoose");
const User = require("../models/User");
const axios = require("axios"); 

const apiConnect = (client) => {
    app.use(express.json());
    
    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passport.use(new DiscordStrategy({
        clientID: config.api.dashboard.clientID,
        clientSecret: config.api.dashboard.clientSecret,
        callbackURL: config.api.dashboard.callbackURL,
        scope: ['identify', 'guilds', 'guilds.join']
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOneAndUpdate({ userId: profile.id }, { accessToken: accessToken }, { new: true, upsert: true })
            .then((user) => {
                console.log("User token saved successfully:", profile.id);
                return done(null, profile);
            })
            .catch((error) => {
                console.error("Error saving user token:", error);
                return done(error);
            });
    }));

    app.get('/auth/discord', passport.authenticate('discord'));

    app.get('/auth/discord/callback',
        passport.authenticate('discord', { failureRedirect: '/' }),
        (req, res) => {
            res.redirect('https://discord.gg/ultrajoins');
        }
    );

    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };

    app.listen(config.api.port, () => {
        console.log(`[API] API server started on port ${config.api.port}`);
    });
};

module.exports = { apiConnect };