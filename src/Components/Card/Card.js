import React from 'react';
import './card.css';
import typeColors from '../../Helpers/PokemonTypes';

function Card( { pokemon } ) {
    return (
        <div className='Card'>

            <div className='Card_img'>

                <img src={pokemon.sprites.other.dream_world.front_default} alt="" />

            </div>


            <div className='Card_name'>
                {pokemon.id}
                <br />
                {pokemon.name}

            </div>

            <div className='Card_types'>

                {pokemon.types.map(type => {
                    return (
                        <div className='Card_type' style= {{backgroundColor: typeColors[type.type.name]}}>

                            {type.type.name}

                        </div>
                    )
                })}

            </div>

            <div className='Card_info'>

                <div className='Card_data poke_height'>

                    <p className='title'>Height</p>
                    {/* Converted from default decimetres into feet rounded to 2 decimal places */}
                    <p>{Math.round((pokemon.height* 0.328084 + 0.00001) * 100) / 100} feet </p>

                </div>

                <div className='Card_data poke_ability'>

                    <p className='title'>Ability</p>
                    <p>{pokemon.abilities[0].ability.name}</p>

                </div>

                <div className='Card_bio'>

                    <p>{pokemon.bio}</p>

                </div>


            </div>

        </div>
    );
}

export default Card;