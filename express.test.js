var superagent = require('superagent')
var expect = require('expect.js')

var imageID1, imageID2

describe('advanced app server', function(){
  it('uploads images (jpg)', function(done){
    superagent.post('http://localhost:3000/image')
      .attach('image', 'test_resources/image.jpg')
      .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.status).to.eql(200)
        expect(res.body.id).not.to.be(undefined)
        imageID1 = res.body.id
        done()
      })
  })

  it('uploads images (png)', function(done){
    superagent.post('http://localhost:3000/image')
      .attach('image', 'test_resources/beach.png')
      .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.status).to.eql(200)
        expect(res.body.id).not.to.be(undefined)
        imageID2 = res.body.id
        done()
      })
  })

  it('serves uploaded images (jpg)', function(done) {
    superagent.get('http://localhost:3000/image/'+imageID1)
      .end(function(e, res) {
        expect(e).to.eql(null)
        expect(res.status).to.eql(200)
        expect(res.body).not.to.be(null)
        expect(res.header["content-type"]).to.eql("image/jpeg")
        done()
      })
  })


  it('serves uploaded images (png)', function(done) {
    superagent.get('http://localhost:3000/image/'+imageID2)
      .end(function(e, res) {
        expect(e).to.eql(null)
        expect(res.status).to.eql(200)
        expect(res.body).not.to.be(null)
        expect(res.header["content-type"]).to.eql("image/png")
        done()
      })
  })

})
