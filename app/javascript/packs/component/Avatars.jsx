import React from 'react'

import pheonixIdle from '../../images/avatars/pheonix/pheonixIdle.gif'
import pheonixNo from '../../images/avatars/pheonix/pheonixNo.gif'
import pheonixObjected from '../../images/avatars/pheonix/pheonixObjected.gif'
import pheonixObjection from '../../images/avatars/pheonix/pheonixObjection.gif'
import pheonixSpeech from '../../images/avatars/pheonix/pheonixSpeech.gif'

import miaIdle from '../../images/avatars/mia/miaIdle.gif'
import miaNo from '../../images/avatars/mia/miaNo.gif'
import miaObjected from '../../images/avatars/mia/miaObjected.gif'
import miaObjection from '../../images/avatars/mia/miaObjection.gif'
import miaSpeech from '../../images/avatars/mia/miaSpeech.gif'


export const Pheonix = ({state, playerName}) => {

  const renderGifs = {
    idle: pheonixIdle,
    defend: pheonixNo,
    objected: pheonixObjected,
    object: pheonixObjection,
    speak: pheonixSpeech,
  }

  return (
    <div>
      <img src={renderGifs[state]} className={playerName == "right" ? "invert" : ""}/>
    </div>
  )
}

export const Mia = ({state, playerName}) => {

  const renderGifs = {
    idle: miaIdle,
    defend: miaNo,
    objected: miaObjected,
    object: miaObjection,
    speak: miaSpeech,
  }

  return (
    <div>
      <img src={renderGifs[state]} className={playerName == "right" ? "invert" : ""}/>
    </div>
  )
}
