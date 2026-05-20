const express = require('express');
const {prisma} = require('./lib/prisma');
const cors = require('cors');

//PASSPORT
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');

const app = express();
