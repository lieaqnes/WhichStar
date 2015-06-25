var mongoose = require('mongoose');

var StarSchema = new mongoose.Schema({
  name: String,
  info: String,
  image_url: String,
  face_id: String
});

StarSchema.statics = {
  findByFaceId: function(id, cb) {
    console.log('findByFaceId');
    return this.findOne({face_id: id})
    .exec(cb);
  },
  findByUrl: function(url, cb) {
    console.log('findByUrl');
    return this.findOne({image_url: url})
    .exec(cb);
  }
};

module.exports = StarSchema;

