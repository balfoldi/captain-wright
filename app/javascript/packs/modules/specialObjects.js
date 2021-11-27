import materialEvidenceImage from "../../images/specialObjects/materialEvidence.jpg"
import falsifiedReportImage from "../../images/specialObjects/falsifiedReport.jpeg"
import witnessImage from "../../images/specialObjects/witness.jpg"
import compromisingPictureImage from "../../images/specialObjects/compromisingPicture.jpg"

const specialObjects = {
  materialEvidence: {
    setStats: [{
      credibility: 30
    }],
    image: materialEvidenceImage,
  },
  falsifiedReport: {
    setStats: [{
      speechcraft: 30
    }],
    image: falsifiedReportImage,
  },
  witness: {
    setStats: [{
      credibility: 10
    }, { speechcraft: 90 }],
    image: witnessImage,
  },
  compromisingPicture: {
    setStats: [{
      credibility: 90
    }, { speechcraft: 10 }],
    image: compromisingPictureImage,
  },
}

export default specialObjects
