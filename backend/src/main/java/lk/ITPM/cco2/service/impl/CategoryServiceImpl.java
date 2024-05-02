package lk.ITPM.cco2.service.impl;

import lk.ITPM.cco2.dto.request.CategoryRequest;
import lk.ITPM.cco2.dto.response.CategoryResponse;
import lk.ITPM.cco2.model.Category;
import lk.ITPM.cco2.repository.CategoryRepository;
import lk.ITPM.cco2.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse create(CategoryRequest request) {

        Category category = new Category();
        category.setId(request.getId());
        category.setCategory(request.getCategory());

        categoryRepository.save(category);
        return null;
    }

    @Override
    public List<CategoryResponse> getAll() {

        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(category -> CategoryResponse.builder()
                        .id(category.getId())
                        .category(category.getCategory())
                        .build())
                .toList();
    }

    @Override
    public CategoryResponse update(CategoryRequest request, String categoryId) {

        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();

            category.setCategory(request.getCategory());

            categoryRepository.save(category);
        }
        return null;
    }

    @Override
    public void delete(String categoryId) {

        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();

            categoryRepository.delete(category);
        }
    }
}

