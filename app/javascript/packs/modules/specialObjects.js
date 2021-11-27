import materialEvidenceImage from "../../images/specialObjects/materialEvidence.jpg"
import falsifiedReportImage from "../../images/specialObjects/falsifiedReport.jpeg"
import witnessImage from "../../images/specialObjects/witness.jpg"
import compromisingPictureImage from "../../images/specialObjects/compromisingPicture.jpg"

const specialObjects = [
  {
    id: 1,
    name: "Material evidence",
    setStats: {
      credibility: 30
    },
    image: materialEvidenceImage,
    used: false,
  },
  {
    id: 2,
    name: "Falsified report",
    setStats: {
      speechcraft: 30
    },
    image: falsifiedReportImage,
    used: false,
  },
  {
    id: 3,
    name: "Undercover witness",
    setStats: {
      credibility: 10,
      speechcraft: 90,
    },
    image: witnessImage,
    used: false,
  },
  {
    id: 4,
    name: "Compromising picture",
    setStats: {
      credibility: 90,
      speechcraft: 10,
    },
    image: compromisingPictureImage,
    used: false,
  },
]

export default specialObjects
