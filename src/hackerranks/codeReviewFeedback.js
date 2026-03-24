import React from "react";

const initialState = {
    Readability: {
        Upvote: 0,
        Downvote: 0,
    },
    Performance: {
        Upvote: 0,
        Downvote: 0,
    },
    Security: {
        Upvote: 0,
        Downvote: 0,
    },
    Documentation: {
        Upvote: 0,
        Downvote: 0,
    },
    Testing: {
        Upvote: 0,
        Downvote: 0,
    },
};

const FeedbackSystem = () => {
    const reducer = (state, action) => {
        switch (action.aspect) {
            case "Readability":
                return {
                    ...state,
                    Readability: {
                        ...state.Readability,
                        [action.voteType]:
                            state.Readability[action.voteType] + 1,
                    },
                };

            case "Performance":
                return {
                    ...state,
                    Performance: {
                        ...state.Performance,
                        [action.voteType]:
                            state.Performance[action.voteType] + 1,
                    },
                };

            case "Security":
                return {
                    ...state,
                    Security: {
                        ...state.Security,
                        [action.voteType]: state.Security[action.voteType] + 1,
                    },
                };

            case "Documentation":
                return {
                    ...state,
                    Documentation: {
                        ...state.Documentation,
                        [action.voteType]:
                            state.Documentation[action.voteType] + 1,
                    },
                };

            case "Testing":
                return {
                    ...state,
                    Testing: {
                        ...state.Testing,
                        [action.voteType]: state.Testing[action.voteType] + 1,
                    },
                };

            default:
                return state;
        }
    };
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <div className="my-0 mx-auto text-center w-mx-1200">
            <div className="flex wrap justify-content-center mt-30 gap-30">
                {Object.entries(state).map(([aspect, votes], index) => (
                    <div key={aspect} className="pa-10 w-300 card">
                        <h2>{aspect}</h2>
                        <div className="flex my-30 mx-0 justify-content-around">
                            <button
                                className="py-10 px-15"
                                data-testid={`upvote-btn-${index}`}
                                onClick={() =>
                                    dispatch({ aspect, voteType: "Upvote" })
                                }
                            >
                                👍 Upvote
                            </button>
                            <button
                                className="py-10 px-15 danger"
                                data-testid={`downvote-btn-${index}`}
                                onClick={() =>
                                    dispatch({ aspect, voteType: "Downvote" })
                                }
                            >
                                👎 Downvote
                            </button>
                        </div>
                        <p
                            className="my-10 mx-0"
                            data-testid={`upvote-count-${index}`}
                        >
                            Upvotes: <strong>{votes.Upvote}</strong>
                        </p>
                        <p
                            className="my-10 mx-0"
                            data-testid={`downvote-count-${index}`}
                        >
                            Downvotes: <strong>{votes.Downvote}</strong>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackSystem;
