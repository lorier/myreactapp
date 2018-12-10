import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './form';

class App extends Component {

  state = { title: "My First Form Title" };
  
  fetchPlants = () => {
    let plants = [];

    fetch('http://atreegarden.com/wp-json/wp/v2/plant/')
    .then(response => response.json())
    .then(plantdata => {
      let imagelink = '';
      plantdata.forEach(plant => {
          let obj = {};
          obj['link'] = plant.link;
          obj['title'] = plant.title.rendered;
          imagelink = plant._links['wp:attachment'][0].href;
          obj['imageLink'] = imagelink;
          fetch( imagelink )
            .then(res => res.json())
            .then(imagedata => {
              obj['imageUrl'] = imagedata[0].source_url;
              // obj['imageUrl'] = 'imagedata.source_url';
              plants.push(obj);
              this.setState({ plants })
            })
          })
        })
      .catch(error => console.error('Error:', error));
    }

    getPlantImage = () => {
      this.setState({ image: this.state.plants[0].url})
    }
    
    componentDidMount() {
      this.fetchPlants();
    }
    showPlant = (plant) => {
      const selectedPlant = this.state.plants.filter((t) => t.title === plant)
      // console.log(selectedPlant); //not sure why I'm getting back an array from filter()
      
      // this.setState({ image: 'http://atreegarden.com/wp-content/uploads/2017/06/IMG_0179.jpg' });
      this.setState({ image: selectedPlant[0].imageUrl });
    }
    
    render() {
      console.log(this.state.plants);
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
              </p>
              <Form title={this.state.title} plants={this.state.plants} image={this.state.image} showPlant={this.showPlant} />
                Learn React
            </header>
          </div>
        );
  }
}

export default App;
