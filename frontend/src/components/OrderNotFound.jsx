import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

const OrderNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      
      <div className="bg-primary/10 rounded-full p-8">
        <ClipboardList className="size-10 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold">No Orders Yet</h3>
        <p className="text-base-content/70 mt-2">
          Ready to create your first order? Start managing orders now.
        </p>
      </div>

      <Link to="/create-order" className="btn btn-primary">
        Add First Order
      </Link>

    </div>
  );
};

export default OrderNotFound;