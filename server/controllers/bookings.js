const bookings = require('../models').booking;
const bookings1 = require('../models').booking;
const rooms = require('../models').rooms;
var numofpeople , numofchild , numofroom,roomid,ageofchild,check_out,check_in1;
var moment = require('moment');
moment().format();
module.exports = {
  create(req, res) 
  {
    roomid=req.body.room_id;
    numofroom=req.body.num_of_rooms;
    numofpeople=req.body.total_person;
    numofadult=req.body.no_of_adults;
    numofchild=req.body.no_of_children;
    ageofchild=req.body.age_of_children;
    //check_in1= req.body.check_in;
    //check_out= req.body.check_out;
     check_in1 = new Date(req.body.check_in);
     check_out = new Date(req.body.check_out);
    //var check_in1 = moment().add('days', 1);
    //var b =new Date();
    //var a =moment(b).format('YYYY-MM-DD');
    // var b= new Date (req.body.check_in);
    // var a=b;
    // var check_out= new Date (req.body.check_out);

    if (numofchild==1 && ageofchild>8)
    res.send("the child age should be less then 8 ");

    else if(numofchild==2 && ageofchild>16)
    res.send("the combined age of children should be less then 16 .");


    bookings.findOne({where:{room_id:roomid,check_in:check_in1,}})   
              .then( bookings=>
                  {
                  
        //  let date=JSON.stringify(bookings.check_out);
        //  console.log(check_in1+""+date );
          if(bookings)
          {
            res.send("already booked")
          }
          // else if(moment(check_in1).isAfter(date))
          // {
          //   res.send("already booked!!");
          // }
          // else if(check_in1>date)
          // {
          //   res.send("already booked!!");
          // }
          // else if (check_in1<date)
          // {
          //   res.send("already booked!!!");
          // }
          // else {
          //   res.send("already booked!!!");
          // }
          else
          {

                  if(numofpeople>=3  && numofroom==1)
                  {
                    res.send("book 2 rooms");
                  }

                  else if (numofadult>3 && numofroom==2 &&  numofchild==0)
                  {
                    res.send("you cannnot book double room");     
                  }

                  else if(numofpeople>3 && numofroom==2 && numofchild==2)
                  {
                    
                     bookings1.create({
                      cust_id:req.body.customer_id,
                      hotel_id1:req.body.hotel_id,
                      room_id: req.body.room_id,
                      no_of_rooms:req.body.num_of_rooms,
                      total_person: req.body.total_person,
                      no_of_adults: req.body.no_of_adults,
                      no_of_children: req.body.no_of_children,
                      age_of_children: req.body.age_of_children,
                      check_in: req.body.check_in,
                      check_out: req.body.check_out,  
                    })
                    .then(bookings1 => res.status(201).send(bookings1))
                    .catch(error => res.status(400).send(error));
                  }
                  else
                  {  
                      bookings1.create({
                      cust_id:req.body.customer_id,
                      hotel_id1:req.body.hotel_id,
                      room_id: req.body.room_id,
                      no_of_rooms:req.body.num_of_rooms,
                      total_person: req.body.total_person,
                      no_of_adults: req.body.no_of_adults,
                      no_of_children: req.body.no_of_children,
                      age_of_children: req.body.age_of_children,
                      check_in: req.body.check_in,
                      check_out: req.body.check_out,
                    })
                    .then(bookings1 => res.status(201).send(bookings1))
                    .catch(error => res.status(400).send(error));
                  }
                }
              })
      }, 
  list(req, res) {    
  return bookings        
  .findAll().then(bookings => {res.send(bookings); });
   },

   destroy(req, res) {
    bookings.destroy({
              where :{
              id:req.params.id
              }
              })
              .then(() =>res.status(200).send("deleted"))
              .catch(error => res.status(400).send(error));
              }, 
           
           
};