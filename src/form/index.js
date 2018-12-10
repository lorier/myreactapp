import React, { Component } from 'react';

class Form extends Component {
    state = {  }
    onSelectChange = (e) => {
        const p = e.target.value;
        this.props.showPlant(p);
    }
    render() { 
        const title = this.props.title;
        const albs = this.props.plants || [];
        const selectedPlant = this.state.plant;
        
        return ( 
            <div>
                <div className="myclass">{title}</div>
                <img src={this.props.image} alt=""/>
                <form>
                    <select value={selectedPlant} onChange={this.onSelectChange}>
                    { albs.map( (plant,index)  => {
                        return(
                            <option key={index} value={plant.title}>{plant.title}</option>
                            // 'Test'
                        )
                        })
                    }
                    </select>
                </form>
                <button className="myButton">Do Something!</button>
            </div>
         );
    }
}
export default Form;