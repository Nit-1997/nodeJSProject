const Promise = require('bluebird');
const config = require('config');
const functions = require('functions');
const models = require('models');
const sequelize = models.sequelize;

module.exports = {
	create: async function (req, res) {
		try{
			let order = req.body;
			console.log(order);
			let val = {
				name:order.customer.name,
				order:('salad:'+order.ingredients.salad+' bacon:'+order.ingredients.bacon+' cheese:'+order.ingredients.cheese+' meat:'+order.ingredients.meat),
				address:order.customer.address.street+' '+order.customer.address.region+' '+order.customer.address.state+' '+order.customer.address.country,
				pincode:order.customer.address.zipCode,
				price:order.price,
				deliveryMethod:order.customer.deliveryMethod
			}
			let data1 = await sequelize.query("INSERT INTO orders(userId,`order`,address,pincode,price,deliveryMethod,createdAt) VALUES(1,"+"'"+val.order+"'"+","+"'"+val.address+"'"+","+val.pincode+","+val.price+","+"'"+val.deliveryMethod+"'"+","+"'"+'2017-02-16 18:22:10.846'+"'"+")", {type: sequelize.QueryTypes.INSERT});
			let data2 = await sequelize.query("INSERT INTO orderContents(orderId,salad,bacon,cheese,meat) VALUES("+data1[0]+","+"'"+order.ingredients.salad+"'"+","+"'"+order.ingredients.bacon+"'"+","+order.ingredients.cheese+","+order.ingredients.meat+")", {type: sequelize.QueryTypes.INSERT});
			res.send(data1);
		}catch(error) {
			console.log(error);
		}
	},
	getIngredients: async function (req, res) {
		try{		
			let data = await sequelize.query("select salad,bacon,cheese,meat from ingredients where id=1", {type: sequelize.QueryTypes.SELECT,raw:true});
			res.send(data);
		}catch(error) {
			console.log(error);
		}
	},
	getOrders: async function(req,res){
		try{
			let data = await sequelize.query("select orders.id,orders.price,orderContents.salad,orderContents.bacon,orderContents.cheese,orderContents.meat from orders join orderContents on orders.id = orderContents.orderId",{type: sequelize.QueryTypes.SELECT});
			let response =[];

			for(let i=0;i<data.length;i++){
				let dummyObj = {
					id:data[i].id,
					price : data[i].price,
					ingredients:{
						salad:data[i].salad,
						bacon:data[i].bacon,
						cheese:data[i].cheese,
						meat:data[i].meat
					}
				}
				response.push(dummyObj);
			}     
			console.log(response);
			res.send(response);
		}catch(error){
			console.log(error);
		}
	}
}


