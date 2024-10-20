"use client";

import React, { useState, useContext, createContext, ReactNode } from "react";
import { BusinessState } from "@/utils/types/business";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  saveBusinessToDb,
  getBusinessFromDb,
  getUserBusinessesFromDb,
  updateBusinessInDb,
  togglePublishedInDb,
  deleteBusinessFromDB,
} from "@/actions/business";
import toast from "react-hot-toast";
import { useRouter, usePathname, useParams } from "next/navigation";
import { handleLogoAction } from "@/actions/cloudinary";
import { aiGenerateBusinessDescription } from "@/actions/ai";
const initialState: BusinessState = {
  _id: "",
  userEmail: "",
  name: "",
  category: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  hours: "",
  logo: "",
  cvr: "",
  status: "",
  slug: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
};
interface BusinessContextType {
  business: BusinessState;
  setBusiness: React.Dispatch<React.SetStateAction<BusinessState>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  deleteloading: boolean;
  setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  initialState: BusinessState;
  logoUploading: boolean;
  generateDescriptiveLoading: boolean;
  generateBusinessDescription: () => void;
  updateBusiness: () => void;
  isEditPage: boolean;
  isDashboardPage: boolean;
  openDescriptiveModal: boolean;
  setOpenDescriptiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  togglePublished: () => void;
  deleteBusiness: () => void;

  businesses: BusinessState[];
  setBusinesses: React.Dispatch<React.SetStateAction<BusinessState[]>>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(
  undefined
);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [business, setBusiness] = useState<BusinessState>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteloading, setDeleteLoading] = useState<boolean>(false);

  const [businesses, setBusinesses] = useState<BusinessState[]>([]);
  const [logoUploading, setLogoUploading] = useState<boolean>(false);
  const [generateDescriptiveLoading, setGenerativeDescriptiveLoading] =
    useState<boolean>(false);
  const [openDescriptiveModal, setOpenDescriptiveModal] =
    useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { _id } = useParams();
  const isDashboardPage = pathname === "/dashboard";
  const isEditPage = pathname.includes("/edit");
  React.useEffect(() => {
    const savedBusiness = localStorage.getItem("business");
    if (savedBusiness) {
      setBusiness(JSON.parse(savedBusiness));
    }
  }, []);
  React.useEffect(() => {
    if (isDashboardPage) getUserBusinesses();
  }, [isDashboardPage]);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handle change running");
    const { name, value, files } = e.target;
    if (name === "logo" && files && files[0]) {
      await handleLogo(files, name);
    } else {
      setBusiness((prevBusiness: BusinessState) => {
        const updatedBusiness = { ...prevBusiness, [name]: value };
        localStorage.setItem("business", JSON.stringify(updatedBusiness));
        return updatedBusiness;
      });
    }
  };
  const deleteBusiness = async () => {
    setDeleteLoading(true);
    try {
      await deleteBusinessFromDB(_id.toString());
      toast.success("Business deleted");
      router.push("/dashboard/admin");
    } catch (err: any) {
      console.error(err);
      toast.error("Error deleting business");
    } finally {
      setDeleteLoading(false);
    }
  };
  const handleLogo = async (files: FileList, name: string) => {
    const file = files[0];
    setLogoUploading(true);
    const reader = new FileReader();
    return new Promise<void>((resolve, reject) => {
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        try {
          const imageUrl = await handleLogoAction(base64Image);
          if (imageUrl) {
            setBusiness((prevBusiness) => {
              const updatedBusiness = { ...prevBusiness, [name]: imageUrl };
              localStorage.setItem("business", JSON.stringify(updatedBusiness));
              return updatedBusiness;
            });
            resolve();
          } else {
            toast.error("Failed to upload error");
          }
        } catch (error) {
          console.error(error);
          toast.error("failed to upload image");
        } finally {
          setLogoUploading(false);
        }
      };
      reader.onerror = (error) => {
        toast.error("Failed to upload image");
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const generateBusinessDescription = async () => {
    setGenerativeDescriptiveLoading(true);
    const { createdAt, updatedAt, __v, ...businessData } = business;
    business.description = "";
    const description = await aiGenerateBusinessDescription(businessData);
    setBusiness((prevBusiness: BusinessState) => {
      const updatedBusiness = { ...prevBusiness, description };
      localStorage.setItem("business", JSON.stringify(updatedBusiness));
      return updatedBusiness;
    });
    toast.success("Business description generated  by AI");
    try {
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to generate description");
    } finally {
      setGenerativeDescriptiveLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      openSignIn();
    } else {
      setLoading(true);
      try {
        const savedBusiness = await saveBusinessToDb(business);
        setBusiness(savedBusiness);
        localStorage.removeItem("business");
        toast.success("Business Saved Successfully");
        router.push(`/dashboard/business/edit/${savedBusiness._id}`);
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to save Business");
      } finally {
        setLoading(false);
      }
    }
  };
  const getUserBusinesses = async () => {
    setLoading(true);
    try {
      const businesses = await getUserBusinessesFromDb();
      setBusinesses(businesses);
    } catch (err: any) {
      console.error(err);
      toast.error("Error fetching business");
    } finally {
      setLoading(false);
    }
  };

  const getBusiness = async () => {
    try {
      const business = await getBusinessFromDb(_id.toString());
      setBusiness(business);
    } catch (error: any) {
      console.error(error);
      toast.error("Error while fetching business");
    }
  };
  React.useEffect(() => {
    if (_id) {
      getBusiness();
    }
  }, [_id]);
  const updateBusiness = async () => {
    setLoading(true);
    try {
      const updatedBusiness = await updateBusinessInDb(business);
      setBusiness(updatedBusiness);
      localStorage.removeItem("business");
      toast.success("Business Updated Successfully");
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to Update business");
    } finally {
      setLoading(false);
    }
  };
  const togglePublished = async () => {
    setLoading(true);
    try {
      const updatedBusiness = await togglePublishedInDb(_id.toString());
      setBusiness((prevBusiness) => ({
        ...prevBusiness,
        published: updatedBusiness?.published,
      }));
      if (updatedBusiness.published) {
        toast.success("Business Published Successfully");
      } else {
        toast.success("Business Unpublished");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("failed to toggle published");
    } finally {
      setLoading(false);
    }
  };
  return (
    <BusinessContext.Provider
      value={{
        business,
        setBusiness,
        loading,
        setLoading,
        handleChange,
        handleSubmit,
        businesses,
        setBusinesses,
        initialState,
        logoUploading,
        generateDescriptiveLoading,
        generateBusinessDescription,
        updateBusiness,
        isEditPage,
        openDescriptiveModal,
        setOpenDescriptiveModal,
        isDashboardPage,
        togglePublished,
        deleteBusiness,
        setDeleteLoading,
        deleteloading,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error("useBusiness must be used in provider");
  }
  return context;
};
