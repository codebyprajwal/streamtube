const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserAuthModel = require("./models/user.model");
const cors = require("cors");
const Youtube = require('youtube-stream-url');
const fs = require("fs")
const bodyParser = require('body-parser');
const webrtc = require("wrtc");
var socket = require('socket.io');

let senderStream;

app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/Users');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(3000);
//socket setup
var io = socket(server);

//video chat stuff
const users = {};

var candidate = [];

io.on('connection', function(socket){
  if (!users[socket.id]) {
        users[socket.id] = socket.id;
    }
  socket.emit("yourID", socket.id);

  io.sockets.emit("allUsers", users);

  socket.on('disconnect', () => {
      console.log('disconnected')

      delete users[socket.id];

      candidate = [];

      io.sockets.emit("available_users", users);
  })

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit('hey', {sdp: data.sdp, from: data.from});
  })

  socket.on("acceptedCall", (data) => {
    io.to(data.guy_I_accepted_call_from).emit('callAccepted', {sdp: data.sdp});
  })

  socket.on("candidate", (data) => {
    candidate.push(data.candidate)

    if(candidate.length < 2){
      io.sockets.emit("got_ice", {candidate: candidate[0], id:socket.id});
    }else{

    }
  })

  console.log('made socket connection')
})


app.post("/user_auth", async (req, res) => {
        try {
                const data = new UserAuthModel({
                        firstname : req.body.firstname,
                        lastname : req.body.lastname,
                        email : req.body.email,
                        password : req.body.password
                });
                await data.save();
                res.json({ status : 'ok' })
        } catch (err) {
                res.json({ status : "err" })
        }
});

app.post("/login", async (req, res) => {
        const user = await UserAuthModel.findOne({
                email : req.body.email,
                password : req.body.password
        });

        if (user) {
		return res.json({ status: "ok" })
        } else {
                return res.json({ status: "err"})
        }
});

app.use("/videoplay", async (req, res) => {
        const id = req.body.id;
        console.log(id)
        const data = await Youtube.getInfo({url: `https://www.youtube.com/watch?v=${id}`});
        return res.send({
                "data" : data.formats[1]
        });
})


app.post("/consumer", async ({ body }, res) => {
    const peer = new webrtc.RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.stunprotocol.org"
            }
        ]
    });
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    senderStream.getTracks().forEach(track => peer.addTrack(track, senderStream));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
        sdp: peer.localDescription
    }

    res.json(payload);
});

app.post('/broadcast', async ({ body }, res) => {
    const peer = new webrtc.RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.stunprotocol.org"
            }
        ]
    });
    peer.ontrack = (e) => handleTrackEvent(e, peer);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
        sdp: peer.localDescription
    }

    res.json(payload);
});

function handleTrackEvent(e, peer) {
    senderStream = e.streams[0];
};

app.use("/", (req, res) => {
        res.send("<h1>Hello World</h1>");
});
