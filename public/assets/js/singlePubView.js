document.getElementById('rzp-button1').onclick = async function(e){
    var options = {
      "key": "rzp_test_bgxLGg4x2C2M0d", 
      "amount": 10000,
      "name": "CLUBBO",
      "description": "pay and party!!",
      "image": "https://res.cloudinary.com/dskmn0vwa/image/upload/v1536835129/vwksex931egcntozjcg6.jpg",
      "handler": function (response){
       console.log(response.razorpay_payment_id);
       $.post('/book',response);
     },
     "prefill": {
      "name": "",
      "email": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#a7f442"
    }
  };

  var rzp1 = new Razorpay(options);

  rzp1.open();
  e.preventDefault();
}
