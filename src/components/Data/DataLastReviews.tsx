import {useState, useEffect} from "react";
import { ILastReviews } from "../Models/ILastReviews";
import { LastReviewsServices } from "../Services/LastReviewsServices";

interface IState {
    loading: boolean,
    lastReviews: ILastReviews[],
    errorMsg: string
}

const DataLastReviews:React.FC = () => {
    const [state, setState] = useState<IState>({
        loading: false,
        lastReviews: [] as ILastReviews[],
        errorMsg: ''
    })

    useEffect(() => {
        setState({...state, loading: true});

        LastReviewsServices.getAllLastReviews()
            .then(res => setState({
                ...state, loading:false, lastReviews:res.data
            }))
            .catch(err => setState({
                ...state, loading:false, errorMsg:err.message
            }));
    },[]);

    const {lastReviews} = state;

    return (
        <>
            {
                lastReviews.length > 0 && lastReviews.map( lastReview => (
                    <div className="post-card">
                        <div className="post-img">
                            <a href={lastReview.url}><img src={lastReview.img} /></a></div>
                        <div className="post-data">
                            <h2><a href={lastReview.url}>{lastReview.title}</a></h2>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default DataLastReviews