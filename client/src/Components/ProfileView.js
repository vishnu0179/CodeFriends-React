import React from 'react'
import { Image, Card } from 'react-bootstrap'
import { useProfile } from './../Context/ProfileProvider'

import Graph from './Graph'
export default function ProfileView() {

    const { profileDetail, contestDetail } = useProfile();

    console.log(contestDetail)
    const str = JSON.stringify(profileDetail);
    
    let img = "https://userpic.codeforces.com/no-title.jpg";
    let rating = 1200
    let handle = "temp"
    let friends = 0
    let maxRating = 1550
    let rank = "noob"
    if(profileDetail !== undefined)
    {
        img = profileDetail.avatar;
        rating = profileDetail.rating;
        maxRating = profileDetail.maxRating;
        friends= profileDetail.friendOfCount;
        handle = profileDetail.handle
        rank = profileDetail.rank
    }
    

    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 navbar navbar-inverse bg-primary"  >
                    <h2 style={{ color: 'white' }}>Profile</h2>
                </div>
            </div>
            <div className = "row mt-4  d-flex justify-content-center">
                <div className=''>
                    <Image src={img} roundedCircle/>
                </div>
            </div>
            <div className="row mt-3">
                <div class ="col-4">
                    <Card
                        bg = "Light"
                        className ="m-2"    
                    >
                        <Card.Header>{handle}</Card.Header>
                        <Card.Text>
                            Rating : {rating}<br/>
                            Rank : {rank}<br/>
                            Friends: {friends} <br/>
                            Max Rating: {maxRating}<br/>
                        </Card.Text>
                    </Card>
                </div>
                <div className="col-md-6">
                    {contestDetail !== undefined ? <Graph/> : ""}
                </div>
            </div>
            <div className="row">
                
            </div>
            
        </div>
    )
}
