import React, { Component } from 'react'
import {recipes} from './tempList'
import RecipeList from './components/RecipeList' 
import RecipeDetails from './components/RecipeDetails' 


export default class App extends Component {

  state = {
    recipes: recipes,
    url: `https://www.food2fork.com/api/search?key=73da9d16a9e7481c2866632b7efbeeaa`,
    base_url: 'https://www.food2fork.com/api/search?key=73da9d16a9e7481c2866632b7efbeeaa',
    details_id: 35384,
    pageIndex: 1,
    search: '',
    query: '&q=',
    error: ''
  }

  async getRecipe(){
    try {
    const data = await fetch(this.state.url)
    const jsData = await data.json()
    if(jsData.recipes.length === 0){
      this.setState(()=>{
        return {error: '404'}
      })
    }
    else {
      this.setState(()=>{
        return {recipes: jsData.recipes
        }
      })
    }
 
  } catch(err){
    console.log(err)
  }
  }

  componentDidMount(){
    this.getRecipe()
  }

  displayPage =(index)=>{
    switch(index){
      default:
        case 1:
          return (<RecipeList 
          recipes={this.state.recipes} 
          handleDetails={this.handleDetails}
          value={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          error={this.state.error}
          />)
        case 0:
          return (<RecipeDetails handleIndex={this.handleDetails} id={this.state.details_id}/>)
    }
  }

  handleIndex=index=>{
    this.setState({
      pageIndex: index
    })
  }

  handleDetails=(index,id)=>{
    this.setState({
      pageIndex: index,
      details_id: id
    })
  }

  handleChange=e=>{
    this.setState({
      search: e.target.value
      
      
    })
  }

  handleSubmit=e=>{
    e.preventDefault()
    const {base_url, query, search} = this.state
    this.setState(()=>{
      return {
        url: `${base_url}${query}${search}`,
        search: ''
      }
    }, ()=>{
      this.getRecipe()
    })
    
  }

  render() {
    console.log(this.state.recipes)
    return (
      <React.Fragment>
        {this.displayPage(this.state.pageIndex)}
        
      </React.Fragment>
        
      
    )
  }
}
