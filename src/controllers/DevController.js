const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store (request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev){
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const { name = login, avatar_url, bio }  = apiResponse.data;
    
      const techsArray = parseStringAsArray(techs);
    
      const location = { 
        type: 'Point',
        coordinates: [longitude, latitude],
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    }
  
    return response.json(dev);
  },

  async update(request, response) {
    const { github_username } = request.params;
    const { name, bio, techs } = request.body;
    const techsArray = parseStringAsArray(techs);
    let answer;

    let dev = await Dev.findOne({ github_username });
    console.log(github_username)
    
    if (dev) {
      await Dev.updateOne({"github_username": github_username}, {$set: { "name": name, "bio": bio, "techs": techsArray}});

      answer = 'Atualizado';
    }else{
      answer = 'Dev não existe!';
    }

    return response.json({ answer: answer });
  },

  async destroy(request, response) {
    const { github_username } = request.params;
    let answer;

    let dev = await Dev.findOne({ github_username });
    console.log(github_username)
    
    if (dev) {
      await Dev.deleteOne({"github_username": github_username});

      answer = 'Deletado';
    }else{
      answer = 'Dev não existe!';
    }

    return response.json({ answer: answer });
  },
}
