const express = require('express');
const {prisma} = require('./lib/prisma');
const cors = require('cors');

//PASSPORT
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

//fetch user check if exists check if password is correct
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
            })

            if (!user) {
                return done(null, false, {message: "Username does not exist"});
            }

            const match = await bcryptjs.compare(password, user.password);

            if (!match) {
                return done(null, false, {message: "Incorrect password"});
            }

            return done(null, user);

        } catch (err) {
            return done(err);
        }
    }));
