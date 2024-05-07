package lk.ITPM.cco2.service;

import lk.ITPM.cco2.dto.request.CategoryRequest;
import lk.ITPM.cco2.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse create(CategoryRequest request);

    List<CategoryResponse> getAll();

    CategoryResponse update(CategoryRequest request, String categoryId);

    void delete(String categoryId);
}
