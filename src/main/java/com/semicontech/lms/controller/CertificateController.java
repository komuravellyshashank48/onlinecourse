package com.semicontech.lms.controller;

import com.semicontech.lms.dto.ApiResponse;
import com.semicontech.lms.entity.Certificate;
import com.semicontech.lms.service.CertificateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @PostMapping("/courses/{courseId}/certificate/generate")
    public ResponseEntity<ApiResponse<Certificate>> generateCertificate(
            @PathVariable Long courseId,
            @AuthenticationPrincipal String email) {
        Certificate cert = certificateService.generateCertificate(email, courseId);
        return ResponseEntity.ok(ApiResponse.success("Certificate generated successfully!", cert));
    }

    @GetMapping("/certificates/my")
    public ResponseEntity<ApiResponse<List<Certificate>>> getMyCertificates(
            @AuthenticationPrincipal String email) {
        List<Certificate> certs = certificateService.getStudentCertificates(email);
        return ResponseEntity.ok(ApiResponse.success(certs));
    }

    @GetMapping("/certificates/verify/{certificateCode}")
    public ResponseEntity<ApiResponse<Certificate>> verifyCertificate(
            @PathVariable String certificateCode) {
        Certificate cert = certificateService.verifyCertificate(certificateCode);
        return ResponseEntity.ok(ApiResponse.success("Certificate is valid and verified", cert));
    }
}
