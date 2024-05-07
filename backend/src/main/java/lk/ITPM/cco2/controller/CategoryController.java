package lk.ITPM.cco2.controller;

import lk.ITPM.cco2.dto.request.CategoryRequest;
import lk.ITPM.cco2.dto.response.CategoryResponse;
import lk.ITPM.cco2.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/categories")
    public CategoryResponse create(@RequestBody CategoryRequest request){
        return categoryService.create(request);
    }

    @GetMapping("/categories")
    public List<CategoryResponse> getAll(){
        return categoryService.getAll();
    }

    @PutMapping("/categories/{category-id}")
    public CategoryResponse update(@RequestBody CategoryRequest request,
                                   @PathVariable ("category-id") String categoryId){
        return categoryService.update(request,categoryId);
    }

    @DeleteMapping("/categories/{category-id}")
    private void delete(@PathVariable ("category-id") String categoryId){
        categoryService.delete(categoryId);
    }
}

