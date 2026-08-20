cmake_minimum_required(VERSION 4.0)
project(sithCode C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(sithCode
        sithCode.c
        sithCode.h
        main.c)

# unit tests
add_executable(sithCode_tests
        test_sithCode.c
        sithCode.c
        sithCode.h
)
