import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './category.entity';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';


describe('CategoryService', () => {
  let service: CategoryService;
  let repo: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useClass: Repository
        },
        CategoryResolver,
        // CategoryService
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repo = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('getAllCategories', () => {
    it('should return an array of categories', async () => {
      const category: CategoryEntity = {
        id: 'randomid',
        categoryName: 'randomname',
      };

      jest.spyOn(repo, 'find').mockResolvedValueOnce([category]);

      const result = await service.getAllCategories();

      expect(result).toEqual([category]);
    });
  });
});