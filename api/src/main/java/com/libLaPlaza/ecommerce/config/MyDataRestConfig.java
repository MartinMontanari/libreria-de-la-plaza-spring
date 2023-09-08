package com.libLaPlaza.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.libLaPlaza.ecommerce.domain.entities.Product;
import com.libLaPlaza.ecommerce.domain.entities.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config){
        HttpMethod[] theUnsoportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        config.getExposureConfiguration()
            .forDomainType(Product.class)
            .withItemExposure((metdata, httMethods) -> httMethods.disable(theUnsoportedActions))
            .withCollectionExposure((metdata, httMethods) -> httMethods.disable(theUnsoportedActions));

        config.getExposureConfiguration()
            .forDomainType(ProductCategory.class)
            .withItemExposure((metdata, httMethods) -> httMethods.disable(theUnsoportedActions))
            .withCollectionExposure((metdata, httMethods) -> httMethods.disable(theUnsoportedActions));
    }
}
