import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const About = () => {
    const navigate = useNavigate()
    const logout = (e)=>{
        axios.get('http://localhost:8000/api/logout',{withCredentials:true})
        .then((res)=> {
            console.log('logged out')
            navigate('/')
        }).catch((err)=> {
            console.log(err)
        })
    }
    return (
        <div style={{backgroundImage:`url(https://i.imgur.com/ytzcMBW.png)`,backgroundSize: 'cover'}} >
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
            <div className='d-flex align-items-center'>
                <h1 className="text-light ms-5">Pokemon Library</h1>
                    <Link to="/home" className="text-success fs-5 ms-5 edit">Home</Link>
                    <Link to="/about" className="text-success fs-5 ms-4 edit">About</Link>
                    <Link to="/liveChat" className="text-success fs-5 ms-4 edit">Join our live chat! </Link>
                </div>
                <div className='me-5 d-flex align-items-center'>
                    <Link to="/addPokemon" className="text-success fs-5 me-4 edit">Add your Pokemon here! </Link>
                    <Link to="/" className="text-success me-4 edit fs-5" onClick={logout}>Logout</Link>
                </div>
            </div>
            <div className="col-6 mx-auto mt-4 text-dark" style={{height:'625px'}}>
                <table className='border border-dark border-3 about'>
                    <h2 className='mt-3'>All about Pokemon Library</h2>
                    <div className='mb-3 mx-3'>
                        <p>Pokem ipsum dolor sit amet Wigglytuff Garbodor Manaphy Yamask Houndour Professor Oak. Swift Voltorb Bagon Skuntank duis aute irure dolor in reprehenderit Pokemon 4Ever Pinsir. Ut enim ad minim veniam Plain Badge Seismitoad I wanna be the very best Spiritomb Krookodile Dragonite. Duis aute irure dolor in reprehenderit in voluptate Chimecho Flying Slowpoke Magikarp used Splash Bronzong Weedle. Ice Bonsly MysteryBerry Dugtrio Pidgeotto Shiftry Shieldon.</p>
                        <p>Ghost Treecko Luxray to extend our reach to the stars above Tornadus Crustle Venusaur. Sinnoh MysteryBerry surrender now or prepare to fight Fearow Milotic Wingull Registeel. Charmeleon Houndoom Tranquill Weezing Thundurus Junichi Masuda make it double. Mineral Badge Plusle Floatzel Chikorita Haxorus Ash's mother Houndour. Volcano Badge Gurdurr Leech Seed Tentacool Electabuzz Glameow Petilil.</p>
                        <p>Glitch City Poison Sting Swalot Chingling Poison Sting Silph Scope Whimsicott. Cerulean City Dodrio to extend our reach to the stars above Umbreon Rising Badge Wooper Honchkrow. Vermilion City Karrablast Anorith Pokemon Machoke Grass Ferroseed. Celadon City Flying Paras Klinklang Mankey Ash Ketchum Oddish. Mineral Badge Mirror Move Medicham Mienshao Parasect Wingull The Power Of One.</p>
                        <p>Meowth, that's right Sigilyph Grovyle Milotic Shaymin Probopass Snubbull. Electric Banette Makuhita Grimer Woobat Mystery Gift anim id est laborum. Soul Badge Minun Aerodactyl Makuhita Articuno Watchog Poke Flute. V for victory Smeargle Simisear Butterfree Sandslash Lavender Town Cascade Badge. Thundershock Gallade Pallet Town Garbodor Bellsprout Venipede I wanna be the very best.</p>
                    </div>
                </table>
            </div>
        </div>
    )
}

export default About