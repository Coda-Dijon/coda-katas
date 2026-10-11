cmake_minimum_required(VERSION 4.0)
project(avengersCensus C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(avengersCensus
        avengersCensus.c
        avengersCensus.h
        main.c)

# unit tests
add_executable(avengersCensus_tests
        test_avengersCensus.c
        avengersCensus.c
        avengersCensus.h
)
