const bookings = require('../models').booking;
const rooms = require('../models').rooms;
const bills = require('../models').bills;
var bookingid,room_id;
let result=0;
module.exports = {
  create(req, res) {
    room_id=req.body.room_id,
    bookingid=req.body.booking_id;

    bookings.findOne({where:{id:bookingid}})
    .then(bookings=>
      {
       // let check_in = JSON.stringify(bookings.check_in);
        //let check_out = JSON.stringify(bookings.check_in)
        //console.log(date);
        if(bookings)
        {
          let noofbeds=rooms.no_of_beds;
          //console.log(bookings.check_in);
          let date = (((bookings.check_in)-(bookings.check_out))/86400000)*-1;
          rooms.findOne({where:{id:room_id,A_C:"1",premium:"1"}})
          .then(rooms=>   
            {
              //let noofbeds=rooms.no_of_beds;
              if(rooms)
              {
                if(noofbeds==1)
                {
              result=2000+(result/100)*10;
              result=result*date;
              res.send("the total bill is :  "  +result);
                }
                else
                {
                  result=2600+(result/100)*10;
                  result=result*date;
                  res.send("the total bill is ::  "  +result);
                }
              }
            })
            rooms.findOne({where:{id:room_id,A_C:"1",premium:"0"}})
            .then(rooms=>
              {
                if(rooms)
                if(noofbeds==1)
                {
                result=2000*date;
                res.send("the total bill is :  "  +result);
                }
                else
                {
                  result=2600*date;
                  res.send("the total bill is :  "  +result);
                }
              })
              rooms.findOne({where:{id:room_id,A_C:"0",premium:"1"}})
            .then(rooms=>
              {
                if(rooms)
                if(noofbeds==1)
                {
                result=1000+(result/100)*10;
                result=result*date;
                res.send("the total bill is :  "  +result);
                }
                else
                {
                  result=1600+(result/100)*10;
                  result=result*date;
                  res.send("the total bill is :  "  +result);
                }
              })
              rooms.findOne({where:{id:room_id,A_C:"0",premium:"0"}})
              .then(rooms=>
                {
                  if(rooms)
                  if(noofbeds==1)
                  {
                  result=1000*date;
                  res.send("the total bill is :  "  +result);
                  }
                  else
                  {
                    result=1600*date;
                    res.send("the total bill is :  "  +result);
                  }
                })
        }
        else
        {
          res.send("booking id is invalid" );
        }
      })
  },
          
};