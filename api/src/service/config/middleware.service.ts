import { Express } from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import session from 'express-session';

import { Facebook } from '../../config/secrets';

export class MiddlewareService {
    constructor(private app: Express) { }

    attachMiddleware(): void {
        this.attachBasics();
        this.attachResponseSetup();
        this.attachPassportAuth();
    }

    attachBasics() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(logger('dev'));
        this.app.use(session({
            secret: 'My', resave: true, saveUninitialized: true
        }))
    }

    attachResponseSetup() {
        const corsOpts = {
            origin: false,
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        };

        this.app.use(cors(corsOpts));
    }

    attachPassportAuth() {
        passport.serializeUser(function (user, cb) {
            cb(null, user);
        });

        passport.deserializeUser(function (obj, cb) {
            cb(null, obj);
        });

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.use(new FacebookStrategy(
            {
                clientID: Facebook.clientId,
                clientSecret: Facebook.clientSecret,
                callbackURL: 'https://127.0.0.1:3000/facebook/callback',

            },
            (token, refreshToken, profile, cb) => {
                cb(null, profile);
            }
        ));

        this.app.get(
            '/auth/facebook',
            passport.authenticate('facebook', { scope: 'user_posts, user_birthday, user_gender, user_photos, user_videos' }), (req, res, next) => {
                console.log(req.user);
                next();
            }
        );

    }
}