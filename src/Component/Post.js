import React from 'react';
import axios from 'axios';
import {PostInfo} from './Post_Components/PostInfo';
import {Social} from './Post_Components/Social';
import Spinner from '../static/images/Spinner.svg'


export class Posts extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      Posts: [],
      Type: 2,
      Count: 10,
      Offset: 0,
      Position: true,
    })
this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount = (lazyLoad) =>{

    const Data = {
      "type": this.state.Type,
      "count": this.state.Count,
      "offset": this.state.Offset
}

setInterval(lazyLoad = () => {


  if (window.pageYOffset > document.documentElement.scrollHeight - 1750) {

  const offset = this.state.Offset + 10;
        axios  ({
            method: 'post',
            url: 'https://dev.apianon.ru:3001/posts/get',
            data: {
              "type": this.state.Type,
              "count": this.state.Count,
              "offset": offset
        }

          })
            .then(res => {


Array.prototype.push.apply(this.state.Posts,res.data.data);


              this.setState({
                 Posts:  this.state.Posts,
                Offset: offset,
               });

            })

            .catch(res => {
                //handle error
                console.log(res);
            });

  } else {

  }
//8400
}, 1000);

    axios  ({
        method: 'post',
        url: 'https://dev.apianon.ru:3001/posts/get',
        data: Data
      })
        .then(res => {
          console.log(res.data.data);
          this.setState({
             Posts: res.data.data,
             Position: false,
           });

        })
        .catch(res => {
            //handle error
            console.log(res);
        });


  }
  render(){
    return (
      <div >
      <div className="Posts" >
          {this.state.Posts.map((post, i) =>


            <div className='Post' key={post.id} >



                <PostInfo
                  postText={post.text}
                  postFoto={post.attachments[0].photo.photo_medium === undefined ? post.attachments[0].photo.photo_small : post.attachments[0].photo.photo_medium }
                  />
                <Social
                  share={post.reposts}
                  like={post.likes.count}
                  dislike={post.dislikes.count}
                  comments={post.comments.count}
                  postviews={post.postviews.count}
                  />


              </div>



          )}
          </div>
          <img
            style={{position: this.state.Position ?'absolute':'static'}}
            className='spinner'
            src={Spinner}
            alt="spinner"/>
      </div>
    )
  };
}
