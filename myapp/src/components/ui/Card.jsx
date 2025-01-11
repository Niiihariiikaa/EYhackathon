// Card.jsx

export const Card = ({ children, ...props }) => (
    <div className="card" {...props}>
      {children}
    </div>
  );
  
  export const CardContent = ({ children, ...props }) => (
    <div className="card-content" {...props}>
      {children}
    </div>
  );
  