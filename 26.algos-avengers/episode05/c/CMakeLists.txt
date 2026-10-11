cmake_minimum_required(VERSION 4.0)
project(averagePower C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(averagePower
        averagePower.c
        averagePower.h
        main.c)

# unit tests
add_executable(averagePower_tests
        test_averagePower.c
        averagePower.c
        averagePower.h
)
target_link_libraries(averagePower_tests m)
