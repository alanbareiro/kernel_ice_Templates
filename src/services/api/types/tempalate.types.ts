// types.ts
import { JSX } from 'react';

export type ModuleType = {
  name: string;
  icon: JSX.Element;
  description: string;
};

export type StackType = {
  frontend: string[];
  backend: string[];
  extras?: string[];
};

export type TemplateType = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: JSX.Element;
  color: string;
  gradientBg: string;
  features: string[];
  stack: StackType;
  deliveryTime: string;
  idealFor: string[];
  modules: ModuleType[];
  priceRange: string;
  useCase: string;
};