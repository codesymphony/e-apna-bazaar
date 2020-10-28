import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './category.entity';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';
import { CategoryInput } from './inputs/category.input';


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
    let result: CategoryDTO[];
    it('should return an array of categories', async () => {
      const category: CategoryEntity = {
        id: 'randomid',
        categoryName: 'randomname',
        createdAt: "10-10-1996",
        updatedAt: "10-10-1996"
      };

      jest.spyOn(repo, 'find').mockResolvedValueOnce([category]);

      result = await service.getAllCategories();

      expect(result).toEqual([category]);
    });

    it('should return the result array', () => {
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(1);
    });
  });

  describe('create category', () => {
    let result: CategoryDTO;
    const input: CategoryInput = {
      categoryName: 'Default',
    };
    beforeEach(async () => {
      jest.spyOn(repo, 'save').mockResolvedValueOnce({
        id: 'AWDAWDAWDAWd',
        ...input,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString()
      });

      result = await service.saveCategory(input);
      expect(result).toMatchObject(input);
    });

  });

  describe('delete category function', () => {
    let mocked: jest.Mock<any>;

    it('should thow error when category not found', done => {
      mocked = jest.fn(() => undefined);

      jest.spyOn(repo, 'findOne').mockImplementationOnce(mocked);

      service.deleteCategory("asdad")
        .then(() => done.fail('did not throw any error'))
        .catch(error => {
          expect(error).toBeInstanceOf(HttpException);
          // expect(error.status).toBe(HttpStatus.NOT_FOUND);
          // console.log(error);
          // expect(error.message).toContain('not exist');

          done();
        })
    });
  });
});