var User = require('../api/user/user.model');
var Admin = require('../api/admin/admin.model');
var Product = require('../api/product/product.model');

//For seeding user data
User.find({}).remove(function(){
    User.create({
            name: 'Johnny',
            email: 'johnny@yahoo.com',
            password: 'johnny'
        },{
            name: 'Ammy',
            email: 'Ammy@yahoo.com',
            password: 'Ammy'},
        function()
        {
            console.log('User data has been seeded!');
        });
});

//For Seeding admin data
Admin.find({}).remove(function(){
    Admin.create({
            name: 'bart',
            username: 'ElBarto',
            email: 'bart@gmail.com',
            password: 'bart',
            role: 'staff'
        },{
            name: 'lisa',
            username: 'lisa',
            email: 'lisa@gmail.com',
            password: 'lisa',
            role: 'manager'},
        function()
        {
            console.log('Admin data has been seeded!');
        });
});

//For seeding product data
Product.find({}).remove(function(){
    Product.create({
            title: 'iPhone case',
            stock: 5,
            price: 30,
            description: 'Suitable for all iPhone6 models',
            category: 'accessory',
            imageUrl: '/assets/uploads/1.jpg'
        },{
            title: 'Pencil',
            stock: 16,
            price: 3,
            description: 'Suitable for children',
            category: 'stationery',
            imageUrl: '/assets/uploads/2.jpg'},
        function()
        {
            console.log('Product data has been seeded!');
        });
});
