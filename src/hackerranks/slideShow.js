import React from "react";

function Slides({ slides }) {
    const [slideIdx, setSlideIdx] = React.useState(0);
    const currentSlide = slides[slideIdx];

    return (
        <div>
            <div id="navigation" className="text-center">
                <button
                    data-testid="button-restart"
                    className="small outlined"
                    onClick={() => setSlideIdx(0)}
                    disabled={slideIdx === 0}
                >
                    Restart
                </button>
                <button
                    data-testid="button-prev"
                    className="small"
                    onClick={() => setSlideIdx((prev) => prev - 1)}
                    disabled={slideIdx === 0}
                >
                    Prev
                </button>
                <button
                    data-testid="button-next"
                    className="small"
                    onClick={() => setSlideIdx((prev) => prev + 1)}
                    disabled={slideIdx === slides.length - 1}
                >
                    Next
                </button>
            </div>
            <div id="slide" className="card text-center">
                <h1 data-testid="title">{currentSlide.title}</h1>
                <p data-testid="text">{currentSlide.text}</p>
            </div>
        </div>
    );
}

export default Slides;
