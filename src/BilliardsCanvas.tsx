import React, { useRef, useEffect, useState } from 'react';

const BilliardsCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [balls, setBalls] = useState<{ x: number, y: number, radius: number, color: string }[]>([
        { x: 50, y: 50, radius: 20, color: 'red' },
        { x: 150, y: 100, radius: 30, color: 'blue' },
    ]);
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
    const [activeBallIndex, setActiveBallIndex] = useState<number | null>(null);

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const mouseX = event.nativeEvent.offsetX;
        const mouseY = event.nativeEvent.offsetY;

        const clickedBallIndex = balls.findIndex(ball => {
            const dx = ball.x - mouseX;
            const dy = ball.y - mouseY;
            return Math.sqrt(dx * dx + dy * dy) <= ball.radius;
        });

        if (clickedBallIndex !== -1) {
            setActiveBallIndex(clickedBallIndex);
        } else {
            setActiveBallIndex(null);
        }

        setMousePosition({ x: mouseX, y: mouseY });
    };

    const handleMouseUp = () => {
        setActiveBallIndex(null);
        setMousePosition(null);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (activeBallIndex !== null && mousePosition !== null) {
            const mouseX = event.nativeEvent.offsetX;
            const mouseY = event.nativeEvent.offsetY;

            const dx = mouseX - mousePosition.x;
            const dy = mouseY - mousePosition.y;

            const newBalls = [...balls];
            newBalls[activeBallIndex] = {
                ...newBalls[activeBallIndex],
                x: newBalls[activeBallIndex].x + dx,
                y: newBalls[activeBallIndex].y + dy
            };
            setBalls(newBalls);
            setMousePosition({ x: mouseX, y: mouseY });
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (context) {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            drawTable(context);
            balls.forEach(ball => drawBall(context, ball));
        }
    }, [balls]);

    const drawTable = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = '#006400';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const drawBall = (ctx: CanvasRenderingContext2D, ball: { x: number, y: number, radius: number, color: string }) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    };

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        />
    );
};

export default BilliardsCanvas;
