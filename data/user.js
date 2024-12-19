import bcrypt from 'bcryptjs';
 const users=[
    {
        name:"Admin User",
        email:"admin@gmail.com",
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
        phoneNumber:"9850929682"
    },
    {
        name:"Jane Smith",
        email:"jane@gmail.com",
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
        phoneNumber:"9850929690"
    },
    {
        name:"Harvey Smith",
        email:"harvey@gmail.com",
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
        phoneNumber:"9850929698"
    },
 ];
 export default users;