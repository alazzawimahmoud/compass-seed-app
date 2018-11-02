export interface IDefault {
  id: string,
  meta: IMeta;
}

export interface IMeta {
  createdBy: string;
  createdDate: Date | string;
  lastModifiedBy: string;
  lastModifiedDate: Date | string;
}

export interface IRole {
  code: string,
  label: string,
  // features;
}

export interface IUser extends IDefault {
  name: string;
  roles: IRole[];
}

export interface ITag extends IDefault {
  label: string;
  posts: { [postId: string]: IPost<any> };
}

export interface ICategory<T, P> extends IDefault {
  label: string;
  description: string;
  icon: string;
  image?: string;
  categoryType: T;
  posts: { [postId: string]: P};
}

export interface IAuthor extends IDefault {
  name: string;
  image: string;
  description: string;
  posts: { [postId: string]: IPost<any> };
}

export interface IPost<T=postTypeTypes> extends IDefault {
  postType: T,
  status: postStatusTypes,

  title: string;
  excerpt: string;
  content?: string;
  image?: string;
  date: Date | string; 

  categories?: { [categoryId: string]: ICategory<any, any> };
  tags?: { [tagId: string]: ITag };

  articleType?;
  author?: IPost;
  attachments?: { [attachmentId: string]: IPost };

  sourceId?: IPost;
  sourceIds?: { [sourceId: string]: IPost };
}


export interface IArticle<A=articleTypeTypes> extends IPost<postTypeEnum.ARTICLE> {
  articleType: A;
  author: IPost;
  attachments?: { [attachmentId: string]: IPost };
}

export interface IMedia<T> extends IPost<T> {
  sourceId: IPost;
  postType: T;
}

export interface IVideo extends IMedia<postTypeEnum.VIDEO> {}

export interface IImage extends IMedia<postTypeEnum.IMAGE> {}

export interface IInfographic extends IMedia<postTypeEnum.INFOGRAPHIC> {}

export interface IGallery extends IPost<postTypeEnum.GALLERY> {
  sourceIds: { [sourceId: string]: IMedia<any> };
}


export enum entitiesEnum {
  users = 'users',
  authors = 'authors',
  posts = 'posts',
  categories = 'categories',
  tags = 'tags',
}

export enum postStatusEnum {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',  
}

export enum articleTypeEnum {
  NEWS = 'NEWS',
  REPORT = 'REPORT',
  INTERVIEW = 'INTERVIEW',
  ARTICLE = 'ARTICLE',
}


export enum postTypeEnum {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  GALLERY = 'GALLERY',
  INFOGRAPHIC = 'INFOGRAPHIC',
  DOCUMENT = 'DOCUMENT',
}

export enum categoryTypeEnum {
  // extends some of postTypeEnum & articleTypeEnum
  GENERAL = 'GENERAL',
}

export type postStatusTypes = 
  postStatusEnum.PUBLISHED |
  postStatusEnum.DRAFT |
  postStatusEnum.ARCHIVED;

export type articleTypeTypes = 
  articleTypeEnum.NEWS |
  articleTypeEnum.REPORT |
  articleTypeEnum.INTERVIEW |
  articleTypeEnum.ARTICLE;

export type postTypeTypes = 
  postTypeEnum.ARTICLE |
  postTypeEnum.VIDEO | 
  postTypeEnum.IMAGE | 
  postTypeEnum.GALLERY | 
  postTypeEnum.INFOGRAPHIC |
  postTypeEnum.DOCUMENT;

export type categoryTypeTypes = 
  categoryTypeEnum.GENERAL |
  postTypeEnum.VIDEO | 
  postTypeEnum.IMAGE | 
  postTypeEnum.GALLERY | 
  postTypeEnum.INFOGRAPHIC |
  articleTypeEnum.ARTICLE |
  articleTypeEnum.INTERVIEW |
  articleTypeEnum.NEWS |
  articleTypeEnum.REPORT;
