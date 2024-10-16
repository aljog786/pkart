import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('111111',10),
        isAdmin: true
    },
    {
        name: 'abc d',
        email: 'abcd@email.com',
        password: bcrypt.hashSync('333333',10),
        isAdmin: false
    },
    {
        name: 'mno p',
        email: 'mnop@email.com',
        password: bcrypt.hashSync('666666',10),
        isAdmin: false
    }
];

export  default users;