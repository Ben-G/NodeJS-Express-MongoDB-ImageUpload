var superagent = require('superagent')
var expect = require('expect.js')

var imageID

describe('advanced app server', function(){
  it('uploads images', function(done){
    superagent.post('http://localhost:3000/image')
      .attach('image', 'test_resources/image.jpg')
      .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.status).to.eql(200)
        expect(res.body.id).not.to.be(undefined)
        imageID = res.body.id
        done()
      })
  })

  it('serves uploaded images', function(done) {
    superagent.get('http://localhost:3000/image/'+imageID)
      .end(function(e, res) {
        expect(e).to.eql(null)
        expect(res.status).to.eql(200)
        expect(res.body).not.to.be(null)
        done()
      })
  })
})
