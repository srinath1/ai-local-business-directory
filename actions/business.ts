"use server";
import db from "@/utils/db";
import Business from "@/models/business";
import { currentUser } from "@clerk/nextjs/server";
import { BusinessState } from "@/utils/types/business";
import { nanoid } from "nanoid";
import slugify from "slugify";

export const saveBusinessToDb = async (data: BusinessState) => {
  try {
    db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const { _id, ...rest } = data;
    const slug = slugify(
      `${rest.category}-${rest.name}-${rest.address}-${nanoid(6)}`
    );
    const business = await Business.create({ ...rest, slug, userEmail });
    return JSON.parse(JSON.stringify(business));
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getUserBusinessesFromDb = async () => {
  try {
    db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const business = await Business.find({ userEmail }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(business));
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getBusinessFromDb = async (_id: string) => {
  try {
    db();
    const business = await Business.findById(_id);
    return JSON.parse(JSON.stringify(business));
  } catch (err: any) {
    throw new Error(err);
  }
};

export const checkOwnership = async (businessId: string) => {
  try {
    await db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const isAdmin = user?.privateMetadata?.role === "admin";
    if (!userEmail) {
      throw new Error("User Not Found");
    }
    const business = await Business.findById(businessId);
    if (!business) {
      throw new Error("Business Not Found");
    }
    if (isAdmin || business.userEmail == userEmail) {
      return true;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateBusinessInDb = async (data: BusinessState) => {
  try {
    await db();
    const { _id, ...rest } = data;
    await checkOwnership(_id);
    const business = await Business.findByIdAndUpdate(_id, rest, { new: true });
    return JSON.parse(JSON.stringify(business));
  } catch (error: any) {
    throw new Error(error);
  }
};

export const togglePublishedInDb = async (_id: string) => {
  try {
    await db();
    try {
      await checkOwnership(_id);
      const business = await Business.findById(_id);
      if (!business) {
        throw new Error("Business Not Found");
      }
      business.published = !business.published;
      await business.save();
      return JSON.parse(JSON.stringify(business));
    } catch (error: any) {
      throw new Error(error);
    }
  } catch (error: any) {}
};

export const getlatestBusinessesFRomDB = async (
  page: number,
  limit: number
) => {
  try {
    await db();
    const [businesses, totalCount] = await Promise.all([
      Business.find({ published: true })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Business.countDocuments({ published: true }),
    ]);
    return {
      businesses: JSON.parse(JSON.stringify(businesses)),
      totalCount,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getBusinessBySlug = async (slug: string) => {
  try {
    await db();
    const business = await Business.findOne({ slug, published: true });
    return JSON.parse(JSON.stringify(business));
  } catch (error: any) {
    throw new Error(error);
  }
};

export const searchBusinessInDB = async (query: string) => {
  try {
    await db();
    const regexQuery = new RegExp(query, "i");
    const businesses = await Business.find({
      $or: [
        { name: regexQuery },
        { category: regexQuery },
        { address: regexQuery },
      ],
      published: true,
    });
    return JSON.parse(JSON.stringify(businesses));
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUniqueCategoriesAndAddresses = async () => {
  try {
    await db();
    const aggregatePipeline = [
      {
        $group: {
          _id: null,
          uniqueCategories: { $addToSet: { $toLower: "$category" } },
          uniqueAddresses: { $addToSet: { $toLower: "$address" } },
        },
      },
      {
        $project: {
          _id: 0,
          uniqueCategories: 1,
          uniqueAddresses: 1,
        },
      },
    ];
    const result = await Business.aggregate(aggregatePipeline);
    if (result.length > 0) {
      return {
        uniquecategories: result[0].uniqueCategories,
        uniqueAddresses: result[0].uniqueAddresses,
      };
    } else {
      return {
        uniquecategories: [],
        uniqueAddresses: [],
      };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllBusinessFromDB = async (page: number, limit: number) => {
  try {
    await db();
    const [businesses, totalCount] = await Promise.all([
      Business.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Business.countDocuments({ published: true }),
    ]);
    return {
      businesses: JSON.parse(JSON.stringify(businesses)),
      totalCount,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteBusinessFromDB = async (_id: string) => {
  try {
    await db();
    await checkOwnership(_id);
    const business = await Business.findByIdAndDelete(_id);
    return JSON.parse(JSON.stringify(business));
  } catch (error: any) {
    throw new Error(error);
  }
};
