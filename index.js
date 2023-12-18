const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
const { User } = require('./model/User');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const { isAuth, sanitizeUser } = require('./services/common');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const crypto = require('crypto');
const SECRET_KEY = 'SECRET_KEY';

const { createProduct } = require('./controller/Product');
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY';

//middlewares
server.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));
server.use(passport.authenticate('session'));
server.use(cors({
    exposedHeaders: ['X-Total-Count']
}))
server.use(express.json()); //to parse req.body
server.use('/products', isAuth(), productsRouter.router);
server.use('/categories',isAuth(), categoriesRouter.router);
server.use('/brands',isAuth(), brandsRouter.router);
server.use('/users',isAuth(), usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart',isAuth(), cartRouter.router);
server.use('/orders', ordersRouter.router);

passport.use('local',
    new LocalStrategy(
        { usernameField: 'email'},
        async function (email, password, done) {
            try {
                const user = await User.findOne({ email: email },).exec();
                console.log(email, password, user)
                if (!user) {
                    done(null, false, { message: 'invalid credentials' })
                }
                crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256',
                    async function (err, hashedPassword) {
                        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                            return done(null, false, { message: 'invalid credentials' });
                        }
                        const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
                        done(null, token);
                    }
                );
            } catch (err) {
                done(err);
            }

        })

);

passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_playload })
    try {
        const user = await User.findOne({ id: jwt_payload.sub })
        if (user) {
            return done(null, sinitizeUser(user));
        } else {
            return done(null, false);
        }
    }catch (err) {
            return done(err, false);
    }
}));


passport.serializeUser(function (user, cb) {
    console.log('serialize', user)
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
        });
    });
});

passport.deserializeUser(function (user, cb) {
    console.log('de-serialize', user);
    process.nextTick(function () {
        return cb(null, { id: user.id, role: user.role });
    });
});

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ebatirem');

    console.log('database connected');

}

server.listen(8080, () => {
    console.log("server started")
})