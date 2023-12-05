import { db } from "../../config/Firebase";
import { collection, getDocs } from "firebase/firestore";

export const queryDoctor = () => {
    const getDoctor = async () => {
        const querySnapshot = await getDocs(collection(db, "medicos"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
    };
    
    return{
        getDoctor,
    }
}