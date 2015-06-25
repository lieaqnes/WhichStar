var mongoose = require('mongoose');

var StarSchema = new mongoose.Schema({
  name: String,
  info: String,
  image_url: String,
  face_id: String
});

StarSchema.statics = {
  findByFaceId: function(id, cb) {
    return this.findOne({face_id: id})
    .exec(cb);
  },
  findByUrl: function(image_url, cb) {
    return this.findOne({image_url: image_url})
    .exec(cb);
  }
};

module.exports = StarSchema;

