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

import franziskaIdle from '../../images/avatars/franziska/franziskaIdle.gif'
import franziskaNo from '../../images/avatars/franziska/franziskaNo.gif'
import franziskaObjected from '../../images/avatars/franziska/franziskaObjected.gif'
import franziskaObjection from '../../images/avatars/franziska/franziskaObjection.gif'
import franziskaSpeech from '../../images/avatars/franziska/franziskaSpeech.gif'

import milesIdle from '../../images/avatars/miles/milesIdle.gif'
import milesNo from '../../images/avatars/miles/milesNo.gif'
import milesObjected from '../../images/avatars/miles/milesObjected.gif'
import milesObjection from '../../images/avatars/miles/milesObjection.gif'
import milesSpeech from '../../images/avatars/miles/milesSpeech.gif'



export const Pheonix = ({state, playerName = "left"}) => {

  const renderGifs = {
    idle: pheonixIdle,
    defend: pheonixNo,
    defeated: pheonixObjected,
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
    defeated: miaObjected,
    object: miaObjection,
    speak: miaSpeech,
  }

  return (
    <div>
      <img src={renderGifs[state]} className={playerName == "right" ? "invert" : ""}/>
    </div>
  )
}

export const Franziska = ({state, playerName}) => {

  const renderGifs = {
    idle: franziskaIdle,
    defend: franziskaNo,
    defeated: franziskaObjected,
    object: franziskaObjection,
    speak: franziskaSpeech,
  }

  return (
    <div>
      <img src={renderGifs[state]} className={playerName == "left" ? "invert" : ""}/>
    </div>
  )
}

export const Miles = ({state, playerName}) => {

  const renderGifs = {
    idle: milesIdle,
    defend: milesNo,
    defeated: milesObjected,
    object: milesObjection,
    speak: milesSpeech,
  }

  return (
    <div>
      <img src={renderGifs[state]} className={playerName == "left" ? "invert" : ""}/>
    </div>
  )
}
