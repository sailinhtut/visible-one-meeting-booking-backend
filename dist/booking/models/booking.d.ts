import { Types } from 'mongoose';
export declare class Booking {
    userId: Types.ObjectId;
    name: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    status: string;
}
export declare const BookingSchema: import("mongoose").Schema<Booking, import("mongoose").Model<Booking, any, any, any, (import("mongoose").Document<unknown, any, Booking, any, import("mongoose").DefaultSchemaOptions> & Booking & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, Booking, any, import("mongoose").DefaultSchemaOptions> & Booking & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Booking>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Booking, import("mongoose").Document<unknown, {}, Booking, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Booking & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Booking, import("mongoose").Document<unknown, {}, Booking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Booking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Booking, import("mongoose").Document<unknown, {}, Booking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Booking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | undefined, Booking, import("mongoose").Document<unknown, {}, Booking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Booking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startTime?: import("mongoose").SchemaDefinitionProperty<Date, Booking, import("mongoose").Document<unknown, {}, Booking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Booking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    endTime?: import("mongoose").SchemaDefinitionProperty<Date, Booking, import("mongoose").Document<unknown, {}, Booking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Booking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Booking, import("mongoose").Document<unknown, {}, Booking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Booking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Booking>;
