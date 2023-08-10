const mongoose = require('mongoose');
const  mongoURI='mongodb://gofood:mern123@ac-he8opjy-shard-00-00.sycpyux.mongodb.net:27017,ac-he8opjy-shard-00-01.sycpyux.mongodb.net:27017,ac-he8opjy-shard-00-02.sycpyux.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-c3sk40-shard-0&authSource=admin&retryWrites=true&w=majority'

// const mongodb= async ()=>{
//  await mongoose.connect(mongoURI,()=>{
//     console.log("connected");
//   })
// }
//console.log("connected");
const mongoDB = async () => {
    await mongoose.connect(mongoURI);
    console.log("connected")
    const fetch_data = mongoose.connection.db.collection("food_items").find({})
    global.food_items = await fetch_data.toArray();
    const food_Catogory = mongoose.connection.db.collection("foodCategory").find({})
    global.foodCategory=await food_Catogory.toArray();
   console.log(global.food_items)
    //(global)
   console.log(global.foodCategory);


//    // if (results.length > 0) {
//     //  results.forEach((result, i) => {
     //       console.log(result)
     //   })
    //}
    //else {
      //  console.log(`No listings found`);
  //  }
    
}


module.exports = mongoDB;